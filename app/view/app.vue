<template>
    <section>
        <h1>{{ msg }}</h1>
        <section class='search'>
            <input v-on:keyup.enter='addCity' v-model='q' type='input' name='q' placeholder='Search'/>
            <label/>
        </section>
        <section class='clock'>
        </section>
        <section class='settings'>
            <button class='ipc-startup'>Open at Login</button>
            <button class='ipc-update'>Check for Update</button>
        </section>
        <section class='exit'>
            <button v-on:click='appQuit'>Quit</button>
        </section>
    </section>
</template>

<script>
    import electron from 'electron'
    // import notice from '../notice'
    const app = electron.remote.app

    export default {
        data() {
            return {
                msg: 'Hello!'
            }
        },
        methods: {
            appQuit: function() {
                app.quit()
            },
            addCity: function(e) {
                // notice.send(this.q)
            },
        },
    }
</script>
