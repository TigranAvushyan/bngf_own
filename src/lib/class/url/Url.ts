class Url {
  private url: string;
  private baseUrl = '';
  private paramsString: string | undefined;

  constructor(url: string) {
    this.url = url;
    this.parse();
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  getParams<T>(): T | null {
    if (this.paramsString) {
      const paramsSplit = this.paramsString.split('&');
      const params: any = {};
      paramsSplit.forEach((el) => {
        const objectSplit = el.split('=');
        const key = objectSplit[0];
        params[key] = objectSplit[1];
      });
      return params;
    }
    return null;
  }

  private parse() {
    const urlSplit = this.url.replace('\"', '').split('?');
    this.baseUrl = urlSplit[0];
    this.paramsString = urlSplit[1];
  }
}

export default Url;
