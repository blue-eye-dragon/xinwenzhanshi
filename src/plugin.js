import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'
import Image from '@/components/my-image'

export default {
    install(Vue){
        Vue.component(MyBread.name,MyBread)
        Vue.component(MyChannel.name,MyChannel)
        Vue.component(Image.name,Image)
    }
}