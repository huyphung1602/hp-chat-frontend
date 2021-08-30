<template>
  <transition
    enter-active-class="transition ease duration-50"
    enter-from-class="transform opacity-0"
    enter-to-class="transform opacity-100"
    leave-active-class="transition ease duration-50"
    leave-from-class="transform opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div class="fixed inset-0 flex justify-center items-center bg-opacity-30 bg-gray-900">
      <div class="w-80 border rounded-md bg-white shadow-lg overflow-x-auto flex flex-col"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="p-5 flex flex-row justify-between border-b"
          id="modalTitle"
        >
          <slot name="header">
            <div class="font-normal text-sm text-gray-800">
              This is the default tile.
            </div>
          </slot>
          <button
            class="text-sm text-gray-500"
            type="button"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section
          class="relative p-5"
          id="modalDescription"
        >
          <slot name="body">
            <div class="font-normal text-sm text-gray-800">
              This is the default body.
            </div>
          </slot>
        </section>

        <footer class="p-2 flex flex-row justify-end border-t bg-gray-100">
          <slot name="footer">
            <button
              class="rounded-md bg-indigo-600 font-normal text-sm text-white hover:bg-indigo-900 focus::bg-indigo-900 focus:outline-none p-2 mr-3"
              type="button"
              @click="resolve"
              aria-label="Submit modal"
            >
              Submit
            </button>
            <button
              class="rounded-md bg-gray-200 font-normal text-sm text-gray-500 hover:bg-gray-300 focus::bg-gray-400 focus:outline-none p-2"
              type="button"
              @click="close"
              aria-label="Close modal"
            >
              Cancel
            </button>
          </slot>

        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Modal',
    emits: ['close', 'resolve'],
    setup(props, { emit }) {
      const close = () => emit('close');
      const resolve = () => emit('resolve');

      return {
        close,
        resolve,
      };
    }
  };
</script>
