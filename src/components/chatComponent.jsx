import React from 'react';
import UsersBar from "../ui/usersBar/usersBar";
import ChatBar from "../ui/chatBar/chatBar";
import UserComponent from "./userComponent";
import MessageComponent from "./messageComponent";
import AddMessageComponent from "./addMessageComponent";
import UserDataComponent from "./userDataComponent";
import {useAuth} from "../hooks/useAuth";
import {DeleteNotification, GetSettings, ReceiveNotification, SendMessage} from "../api/api";
import {useNavigate} from 'react-router-dom';
import {LOGIN_URL} from "../routes/constants";
import Loader from "../ui/loader/loader";
import Cart from "../ui/cart/cart";
import Input from "../ui/input/input";
import Message from "../ui/message/message";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const ChatComponent = () => {
    const {message} = React.useContext(Context);

    const [loading, setLoading] = React.useState(true);
    const [myPhone, setMyPhone] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [addedPhone, setAddedPhone] = React.useState(false);
    const state = useAuth();
    const navigate = useNavigate();
    const [messageInput, setMessageInput] = React.useState('');
    const [idMessage, setIdMessage] = React.useState('');
    const [parse, setParse] = React.useState(true);

    React.useEffect(() => {
        GetSettings(localStorage.getItem('instance'), localStorage.getItem('token'))
            .then(data =>  {
                setMyPhone(data.data.wid.split('@')[0])
            })
            .catch(() => navigate(LOGIN_URL))
            .finally(() => setLoading(false))
    }, [state, navigate])

    const changePhone = e => {
        setPhone(e.target.value);
    }

    React.useEffect(() => {
        const contact = localStorage.getItem('contact');
        if (contact) {
            setPhone(contact);
            setAddedPhone(true);
        }
    }, [])

    const addContact = () => {
        localStorage.setItem('contact', phone.split('+')[1]);
        setAddedPhone(true)
    }

    const writeMessage = e => {
        setMessageInput(e.target.value)
    }

    const send = async e => {
        if (e.keyCode === 13){
            setParse(false)

            SendMessage(
                localStorage.getItem('instance'),
                localStorage.getItem('token'),
                localStorage.getItem('contact') + '@c.us',
                messageInput)
                .then(data => {
                    setIdMessage(data.idMessage)
                    ReceiveNotification(localStorage.getItem('instance'), localStorage.getItem('token')).then(data => {
                        if (data.data?.body?.senderData?.chatId === localStorage.getItem('contact') + '@c.us'){
                            setIdMessage('')
                            setMessageInput('')
                            message.setMessages({id: data?.data?.body?.idMessage, message: data?.data?.body?.messageData?.extendedTextMessageData?.text})
                            console.log(message.isMessages)
                            DeleteNotification(localStorage.getItem('instance'), localStorage.getItem('token'), data?.data?.receiptId)
                                .then(data => {
                                    if (data){
                                        setParse(true)
                                    }
                                })
                        }
                    })
                })
        }
    }

    React.useEffect(() => {
        if (parse){
            if (!idMessage) {
                setParse(false)
                ReceiveNotification(localStorage.getItem('instance'), localStorage.getItem('token')).then(data => {
                    if (data.data?.body?.senderData?.chatId === localStorage.getItem('contact') + '@c.us'){
                        message.setMessages({id: data?.data?.body?.idMessage, message: data?.data?.body?.messageData?.textMessageData?.textMessage, type: 'user'})
                        DeleteNotification(localStorage.getItem('instance'), localStorage.getItem('token'), data?.data?.receiptId)
                            .then(data => {
                                if(data){
                                    setParse(true)
                                }
                            })
                    } else {
                        DeleteNotification(localStorage.getItem('instance'), localStorage.getItem('token'), data?.data?.receiptId)
                            .then(data => {
                                if(data){
                                    setParse(true)
                                }
                            })
                            .catch(() => setParse(true))
                        }
                    })
                console.log('parsing')
            }
        }
        console.log('stop parsing')
    }, [parse, idMessage, message])


    if (loading){
        return <Loader/>
    }

    return (
        !addedPhone
            ?
            <div className="flex ai_center jc_center h_100">
                <Cart>
                    <Input label='Кому пишем?' value={phone} onChange={changePhone} labelFor='phone'/>
                    <Input type='submit' value='Добавить' onClick={addContact}/>
                </Cart>
            </div>
            :
            <>
                <UsersBar>
                    <UserComponent>{myPhone}</UserComponent>
                </UsersBar>
                <ChatBar>
                    <UserDataComponent>{localStorage.getItem('contact')}</UserDataComponent>
                    <MessageComponent>
                        {
                            message.isMessages.map(item => <Message key={item.id} type={item?.type}>{item.message}</Message>)
                        }
                    </MessageComponent>
                    <AddMessageComponent
                        value={messageInput}
                        onChange={writeMessage}
                        onKeyUp={send}
                    />
                </ChatBar>
            </>
    );
};

export default observer(ChatComponent);