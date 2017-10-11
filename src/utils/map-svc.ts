import { getValidNaviTypes, openNavi } from 'react-native-open-navi'
const MAPS_TYPE = {
    BAIDU: 'baidu',
    GAODE: 'amap',
    GOOGLE: 'google',
    APPLE: 'apple'
}

let MapSvc = {
    async getLocation() {
        return await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
    },

    async getMapTypes() {
        return await getValidNaviTypes();
    },

    openNav(type, targetLocation) {
        openNavi(type, this.getLocation(), { name: targetLocation });
    }
}

export { MAPS_TYPE, MapSvc };