
export const getCookie = (name) => {
    let ca         = document.cookie.split(';');
    let caLen      = ca.length;
    let cookieName = `${name}=`;
    let c;

    for (let i = 0; i < caLen; i += 1) {

      c = ca[i].replace(/^\s+/g, '');

      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
}

export const deleteCookie = (cookieName) => {
    this.set({ name:cookieName, value:'', expireDays:-1 });
}

export const setCookie = (params) => {
    let d = new Date();
    d.setTime(d.getTime() + (params.expireDays ? params.expireDays:1) * 24 * 60 * 60 * 1000); 
    document.cookie = 
        (params.name? params.name:'') + "=" + (params.value?params.value:'') + ";"
        + (params.session && params.session === true ? "" : "expires=" + d.toUTCString() + ";")
        + "path=" +(params.path && params.path.length > 0 ? params.path:"/") + ";"
        + (window.location.protocol === 'https:' && params.secure && params.secure === true ? "secure":"");
}