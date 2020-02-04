import { AppColors, MaterialColors } from './Colors';
/**
 * Typography:
 * This contains all the typography config for the application
 * #Note: color and font size are defaulted as they can be overridden
 *        as required.
 */

const Typography = {
    Heading: {
        h1: {
            color: MaterialColors.grey[50]
        },
        bold: {
            fontSize: 24,
            fontFamily: 'SFProDisplay-Bold',
            color: '#000'
        },
        semiBold: {
            fontSize: 24,
            fontFamily: 'SFProDisplay-SemiBold',
            color: '#000'
        }
    },
    Body: {
        regular: {
            fontSize: 20,
            fontFamily: 'SFProDisplay-Regular',
            color: '#000'
        },
        light: {
            fontSize: 16,
            fontFamily: 'SFProDisplay-Light',
            color: '#000'
        },
        dark: {
            // fontSize: 15,
            // fontFamily: 'SFProDisplay-Light',
            fontFamily: 'sans-serif-regular',
            // fontFamily: 'Corporate S Regular',
            color: AppColors.whisper,
            // letterSpacing: -0.25,
            // lineHeight: 24,
        }
    },
    Caption: {
        thin: {
            fontSize: 12,
            fontFamily: 'SFProDisplay-Thin',
            color: '#000'
        }
    }
};

export default Typography;
