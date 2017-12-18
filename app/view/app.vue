<template>
    <div>
        <section class='search'>
            <input v-on:keyup.enter='addCity' v-on:keyup='searchCity' v-model.trim='q' type='input' name='q' placeholder='Search'/>
            <label>{{ searchLabel }}</label>
        </section>
        <clocks></clocks>
        <section class='settings'>
            <button v-on:click='launchToggle' v-bind:class='{active: launchIsActive}'>Open at Login</button>
            <button v-on:click='checkUpdate'>Check for Update</button>
        </section>
        <section class='exit'>
            <button v-on:click='appQuit'>Quit</button>
        </section>
    </div>
</template>

<script>
    import clocks from './components/clocks.vue';

    import electron from 'electron'
    import notice from '../notice'
    import launch from '../launch'
    import updater from '../updater'
    import window from '../window'
    import db from '../db'
    const app = electron.remote.app

    export default {
        data() {
            return {
                searchLabel: '',
                launchIsActive: app.getLoginItemSettings().openAtLogin,
            }
        },
        components: { clocks },
        methods: {
            appQuit: function() {
                app.quit()
            },
            addCity: function(e) {
                notice.send(this.q)
            },
            searchCity: function() {
                if(this.q == '') this.searchLabel = ''
                else {
                    db.find(`SELECT name, UPPER(country) code FROM cities WHERE city LIKE '${this.q}%' ORDER BY popularity DESC LIMIT 1`, city => {
                        this.searchLabel = !city ? 'Not found' : city.name + ', ' + city.code
                    })
                }
            },
            launchToggle: function() {
                this.launchIsActive = this.launchIsActive ? 0 : 1
                launch.toggle()
            },
            checkUpdate: function() {
                updater.check({ win:window.getWin() })
            },
        }
    }
</script>
