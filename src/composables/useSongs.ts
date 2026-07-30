import { ref } from 'vue'

const musicEnabled = ref(false)
const musicVolume = ref(1)

export function useSongs() {

    function toggleMusic() {
        musicEnabled.value = !musicEnabled.value
    }

    function setMusicVolume(volume: number) {
        musicVolume.value = Math.min(1, Math.max(0, volume))
    }

    return {
        musicEnabled,
        musicVolume,
        toggleMusic,
        setMusicVolume
    }
}