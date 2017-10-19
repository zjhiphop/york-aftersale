import * as React from 'react';
import { ScrollView, Text, AsyncStorage, StyleSheet } from 'react-native';
import { InputItem, List, Button, WhiteSpace } from 'antd-mobile';
import Autolink from 'react-native-autolink';

export default class AboutScreen extends React.Component {
    render() {
        return <ScrollView style={styles.container}>
            <Text style={styles.title}>公司简介</Text>
            <Text style={styles.frag}>   无锡米勒人工环境有限公司成立于1999年，是国内首批集中央空调工程销售、设计、安装、维护保养一体化的专业公司，并且从事体育设备，健身器材，机电设备，水泵，阀门，建材，陶瓷制品，卫生洁具批发，零售，泳池桑拿设备安装，保养公司经数载春秋，发展至今已具规模，拥有一套先进的工程及服务的管理体系，拥有一支定期强化培训，具有丰富实践经验的专业施工和售后服务队伍，并且得到了约克（中国）商贸的信任和支持，成为约克中央空调苏锡常地区唯一囤货商及VIP经销商，多次参与了由约克（中国）商贸提供的长江商学院及复旦大学等的各类专业培训。我们一直在不断的总结、学习、提高。</Text>
            <Text style={styles.frag}>   公司在无锡地区有稳定的大型物流仓库，为苏锡常用户及时提供各类型号的空调设备。并与全国经销商进行型号互动。</Text>
            <Text style={styles.frag}>   公司配备了服务中心，零配件供应仓库，售后服务车以及高精度的检测调试设备，对所有用户均建立了客户档案进行质量跟踪服务。</Text>
            <Text style={styles.frag}>   公司为我们的经销商和用户提供最佳的暖通空调解决方案，无论客户是家用的还是商用的，都会获得理想中的优质技术产品和最适合的系统方案。</Text>
            <Text style={styles.frag}>   我公司是无锡市人民大会堂、无锡市鸿山镇政府、无锡火车站北广场、无锡地铁一号线、无锡三馆、无锡市文化宫、常州奔牛飞机场、常州武进凤凰谷大剧院等政府部门的约克空调设备供应商，为中行锡山支行、无锡浦发银行新区支行、无锡市第四人民医院、河埒文化剧场、无锡市308部队、无锡市国际学校等学校医院银行提供约克空调设备，承接了苏州市芭堤兰湾、苏州融侨置业、苏州旭辉房产、无锡市万科魅力之城、无锡阳光100、无锡市房地产开发有限公司等房产项目约克中央空调和地暖工程。承接了无锡市惠源包装、普利司通轮胎(无锡)有限公司、康明斯发电机技术（中国）有限公司、无锡百发电机、无锡卡特比特、太仓和路雪、江苏永康机械有限公司、太仓环宇包装材料有限公司、尚品太阳能电力科技有限公司、无锡市百喜宾馆、常州和平国际商城、无锡东马锅炉、无锡马山元一希尔顿酒店、无锡凯宾斯基酒店、无锡新时代交流电机有限公司、无锡市蠡园电子、村田电子(无锡)有限公司等工厂及酒店工程，并以优质高效的服务获得用户一致好评。</Text>
            <Text style={styles.frag}>
                远    景：成为约克空调江苏地区销售、设计、安装、维护的专业空调公司。
            </Text>
            <Text style={styles.frag}>
                客户关系：把客户放在首位，为客户提供诚信，在一切活动中奉行最高的道德行为标准。
            </Text>
            <Text style={styles.frag}>
                以人为本：有效的提升个人能力并且加强组织凝聚力。
            </Text>
            <Text style={styles.frag}>
                团结合作：通过彼此之间与客户、供应商之间的相互合作，相互尊重，充分发挥米勒的力量。
            </Text>
            <Text style={styles.frag}>
                学习创新：积极地学习，追求创新，并使他人受益。
            </Text>
            <Text style={styles.frag}>
                领导品质：有勇气做出困难的决定，有勇气去改变现状，超越竞争对手，身体力行。
            </Text>
            <Text style={styles.frag}>
                我们目标：为客户提供最高水平和最高品质的服务，远超客户的期望。
            </Text>
            <Text style={styles.frag}>
                行动纲领：完美、没有借口、马上行动、服务至上。
            </Text>
            <Autolink style={styles.contact} text="直线： 0510-66752598"></Autolink>
            <Autolink style={styles.contact} text="售后：  0510-82113087 "></Autolink>
            <Autolink style={styles.contact} text="传真： 0510-82106084"></Autolink>
            <Autolink style={styles.contact} text="邮箱： villa@villacn.com"></Autolink>
        </ScrollView>
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        fontSize: 22,
        color: '#666',
        textAlign: 'center',
        margin: 10
    },
    frag: {
        fontSize: 18,
        color: '#999',
        margin: 10,
        lineHeight: 25
    },
    contact: {
        textAlign: 'center',
        fontSize: 20,
        lineHeight: 23,
        marginBottom: 20,
        color: '#333'
    }
})