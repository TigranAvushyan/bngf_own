import { http_post } from '../../server/http';
import { getFileObject } from '../../utils';
import { AxiosRequestConfig } from 'axios';
import { ImageUriType } from '../../types/image';
import { urls } from '../../server/urls';


export class ChatHTTPRequests {
  chatId: number;
  url: string;
  private config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  constructor(chatId: number) {
    this.chatId = chatId;
    this.url = urls.chatSend(chatId);
  }

  async sendText(text: string, time_send: string, parent?: number) {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('time_send', time_send);
    if (parent) {
      formData.append('parents', parent.toString());
    }
    const res = await http_post<{ id: number }>(this.url, formData);
    return res.id;
  }

  async sendDocument(documentUri: string, documentName: string, time_send: string, parent?: number) {
    const formData = ChatHTTPRequests.getFormData('file', getFileObject(documentUri, documentName));
    if (parent) {
      formData.append('parents', parent.toString());
    }
    formData.append('time_send', time_send);
    const res = await this.sendHttpFormData(formData);
    return res.id;
  }

  async sendMedia(images: ImageUriType[], time_send: string, parent?: number) {
    const formData = new FormData();
    images.forEach((i) => {
      // @ts-ignore
      formData.append('media', getFileObject(i.uri));
    });
    formData.append('time_send', time_send);
    if (parent) {
      formData.append('parents', parent.toString());
    }


    const res = await this.sendHttpFormData(formData);

    return res.id;
  }

  async sendAudio(audioUri: string, time_send: string, parent?: number) {
    const formData = ChatHTTPRequests.getFormData('audio', getFileObject(audioUri));
    formData.append('time_send', time_send);
    if (parent) {
      formData.append('parents', parent.toString());
    }
    const res = await this.sendHttpFormData(formData);
    return res.id;
  }

  private static getFormData<T>(key: string, value: T) {
    const formData = new FormData();
    // @ts-ignore
    formData.append(key, value);
    return formData;
  }

  private sendHttpFormData(formData: FormData) {
    return http_post<{ id: number }>(this.url, formData, this.config);
  }
}
