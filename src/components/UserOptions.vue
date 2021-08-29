<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        type="button"
        class="bg-indigo-50 inline-flex justify-center w-full m-2"
        aria-expanded="true"
        aria-haspopup="true"
        @click.prevent="toggleDropdown()"
      >
        <!-- Heroicon name: solid/chevron-down -->
        <svg v-if="!showDropdown" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
        
      </button>
    </div>

    <!--
      Dropdown menu, show/hide based on menu state.

      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="showDropdown"
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        :class="{'transition ease-out duration-100': showDropdown}"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <div
            class="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-50"
            role="menuitem"
            tabindex="-1" id="menu-item-0"
          >
            Create Room
          </div>
          <div
            class="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-50"
            role="menuitem"
            tabindex="-1" id="menu-item-0"
          >
            Join Room
          </div>
          <div
            class="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-50"
            role="menuitem"
            tabindex="-1" id="menu-item-0"
          >
            Sign out
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'UserOptions',
  setup() {
    const showDropdown = ref(false);

    const toggleDropdown = () => showDropdown.value = !showDropdown.value;
    return {
      showDropdown,
      toggleDropdown,
    };
  }
}
</script>
