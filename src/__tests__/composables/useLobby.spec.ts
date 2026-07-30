import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import { useLobby } from "../../composables/useLobby";

const lobby = ref({
  id: "ABC123",
  players: [],
});

vi.mock("../../stores/lobby", () => ({
  useLobbyStore: () => ({
    lobby,
  }),
}));

vi.mock("../../sockets/emit/createLobby", () => ({
  createLobby: vi.fn(),
}));

vi.mock("../../sockets/emit/joinLobby", () => ({
  joinLobby: vi.fn(),
}));

vi.mock("../../sockets/emit/addAI", () => ({
  addAI: vi.fn(),
}));

import { createLobby } from "../../sockets/emit/createLobby";
import { joinLobby } from "../../sockets/emit/joinLobby";
import { addAI } from "../../sockets/emit/addAI";

const createLobbyMock = vi.mocked(createLobby);
const joinLobbyMock = vi.mocked(joinLobby);
const addAIMock = vi.mocked(addAI);

describe("useLobby", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the lobby from the store", () => {
    const composable = useLobby();

    expect(composable.lobby).toBe(lobby);
  });

  it("creates a lobby", () => {
    const { create } = useLobby();

    create("John");

    expect(createLobbyMock).toHaveBeenCalledTimes(1);
    expect(createLobbyMock).toHaveBeenCalledWith({
      name: "John",
      isAI: false,
    });
  });

  it("joins a lobby", () => {
    const { join } = useLobby();

    join("ABC123", "John");

    expect(joinLobbyMock).toHaveBeenCalledTimes(1);
    expect(joinLobbyMock).toHaveBeenCalledWith("ABC123", "John");
  });

  it("adds an AI player", () => {
    const { addOneAI } = useLobby();

    addOneAI("ABC123");

    expect(addAIMock).toHaveBeenCalledTimes(1);
    expect(addAIMock).toHaveBeenCalledWith("ABC123");
  });
});