export function useStorage() {
  function saveId(id: string) {
    localStorage.setItem("id", id);
  }

  function getId() {
    return localStorage.getItem("id");
  }

  function saveName(name: string) {
    localStorage.setItem("name", name);
  }

  function getName() {
    return localStorage.getItem("name");
  }

  return {
    saveId,
    getId,
    saveName,
    getName,
  }
}
