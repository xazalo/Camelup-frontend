export const storage = {
  saveId(id: string) {
    localStorage.setItem("id", id);
  },

  getId() {
    return localStorage.getItem("id");
  },

  saveName(name: string) {
    localStorage.setItem("name", name);
  },

  getName() {
    return localStorage.getItem("name");
  },
};