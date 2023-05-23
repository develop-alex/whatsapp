import {$host} from "../http/axios";

export const GetSettings = async (instance, token) => {
    return await $host.get(`/waInstance${instance}/GetSettings/${token}`);
}

export const SendMessage = async (instance, token, chatId, message) => {
    return await $host.post(`/waInstance${instance}/SendMessage/${token}`, {chatId, message});
}

export const ReceiveNotification = async (instance, token) => {
    return await $host.get(`/waInstance${instance}/ReceiveNotification/${token}`);
}

export const DeleteNotification = async (instance, token, receiptId) => {
    return await $host.delete(`/waInstance${instance}/DeleteNotification/${token}/${Number(receiptId)}`);
}