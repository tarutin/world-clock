<template>
    <section class='clock'>
        <button v-for='clock in clocks' v-bind:class='{active: clock.tray}'>
            {{ clock.full }}
            <clock v-bind:offset='clock.offset'></clock>
            <span class='delete'><i class='fa fa-fw fa-times-circle fa-fw'></i></span>
        </button>
    </section>
</template>

<script>
    // process.stdout.write(vm.$attrs.offset + '\n')
    const settings = require('electron-settings')

    var clock = {
        template: `<time v-model='offset'>{{ time | timeformat }}</time>`,
        props: {
            'offset': Number
        },
        mounted() {
            window.setInterval(() => {
                this.time = Math.floor(new Date().getTime()) + this.offset * 3600000
            }, 1000)
        },
        data() {
            return {
                time: Math.floor(new Date().getTime()) + this.offset * 3600000,
            }
        },
        filters: {
            timeformat: function(value) {
                var date = new Date(value)
                var hours = date.getUTCHours()
                var minutes = '0' + date.getUTCMinutes()
                var seconds = '0' + date.getUTCSeconds()

                return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
            },
        },
        // computed: {
        //     inMilliseconds() {
        //         return this.offset * 3600000
        //     }
        // },
    }

    export default {
        data() {
            return {
                clocks: settings.get('clocks'),
            }
        },
        components: { clock },
    }
</script>
