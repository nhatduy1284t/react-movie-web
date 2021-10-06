
import axios from "axios";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { TOKEN_CYBERSOFT } from "../../util/settings";


export const getCarouselAction = () => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.layDanhSachBanner();
            

            dispatch({
                type: 'SET_CAROUSEL',
                arrImg: result.data.content
            })
        } catch (error) {
            console.log('error', error)

        }
    }
}

