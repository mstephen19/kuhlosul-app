export const validateEmail = (email) => {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
};

class sendLimit {
  saveSentTime() {
    const now = new Date(Date.now());
    sessionStorage.setItem('lastSent', JSON.stringify(now));
  }
  getLastSent() {
    return JSON.parse(sessionStorage.getItem('lastSent'));
  }
  canSend() {
    const now = new Date(Date.now());
    const then = this.getLastSent();
    if (!then) return true;

    const timeDiff = Math.abs(then - now);
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (dayDiff >= 1) return true;
    return false;
  }
}

export default new sendLimit();
