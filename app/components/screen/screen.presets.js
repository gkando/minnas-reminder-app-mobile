import { ViewStyle } from "react-native"
import { AppColors } from '../../theme';

/**
 * All screen keyboard offsets.
 */
export const offsets = {
  none: 0,
}

/**
 * All the variations of screens.
 */
export const presets = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    outer: {
      backgroundColor: AppColors.background,
      flex: 1,
      height: "100%",
    },
    inner: {
      justifyContent: "flex-start",
      alignItems: "stretch",
      height: "100%",
      width: "100%",
    },
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    outer: {
      backgroundColor: AppColors.background,
      flex: 1,
      height: "100%",
    },
    inner: { justifyContent: "flex-start", alignItems: "stretch" },
  },
}

// export function isNonScrolling() {
//   // any of these things will make you scroll
//   return isNil(preset) || !preset.length || isNil(presets[preset]) || preset === "fixed"
// }
