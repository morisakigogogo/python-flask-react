/* webStorage DES
auth: Antony Han 2019/10/13 */
class WebStorage {
  setItem(key, val) {
    const message = JSON.stringify(val);
    localStorage.setItem(key, message);
  }
  getItem(key) {
    const str = localStorage.getItem(key);
    let message = '';
    if (str) {
      message = str;
      try {
        return JSON.parse(message);
      } catch (e) {
        return str;
      }
    }
    return '';
  }
  removeItem(key) {
    localStorage.removeItem(key);
  }
  removeAll() {
    localStorage.clear();
  }
  queryOfkey(key, name) {
    const obj = localStorage.getItem(key);
    return obj ? obj[name] : '';
  }
}

const storage = new WebStorage();
export default storage;
