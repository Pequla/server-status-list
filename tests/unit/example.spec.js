import {shallowMount} from '@vue/test-utils'
import ServerList from '@/components/ServerList.vue'

describe('ServerList.vue', () => {
    it('renders props.servers when passed', () => {
        const servers = [{
            "addr": "test.sample",
            "description": {
                "text": ""
            },
            "players": {
                "max": 100,
                "online": 1,
                "sample": [
                    {
                        "name": "Turtle_Turton",
                        "id": "be5e7e8e-f511-4995-9e3f-bf6d8d77ead6"
                    }
                ]
            },
            "version": {
                "name": "Paper 1.19.2",
                "protocol": 760
            },
            "favicon": "data:image/png;base64,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",
            "time": 0
        }]
        const wrapper = shallowMount(ServerList, {
            props: {servers}
        })
        expect(wrapper.props[0].addr).toMatch('test.sample');
    })
})
