export const storage = {
  savePlayerId(playerId: string) {
    localStorage.setItem("playerId", playerId);
  },

  getPlayerId() {
    return localStorage.getItem("playerId");
  },

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
