import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "[class^='flaticon-']:before": {
        "fontFamily": "Flaticon",
        "fontSize": 20,
        "fontStyle": "normal",
        "marginLeft": 20
    },
    "[class*=' flaticon-']:before": {
        "fontFamily": "Flaticon",
        "fontSize": 20,
        "fontStyle": "normal",
        "marginLeft": 20
    },
    "[class^='flaticon-']:after": {
        "fontFamily": "Flaticon",
        "fontSize": 20,
        "fontStyle": "normal",
        "marginLeft": 20
    },
    "[class*=' flaticon-']:after": {
        "fontFamily": "Flaticon",
        "fontSize": 20,
        "fontStyle": "normal",
        "marginLeft": 20
    },
    "flaticon-arrows:before": {
        "content": "'\\f100'"
    },
    "flaticon-arrows-1:before": {
        "content": "'\\f101'"
    },
    "flaticon-arrows-2:before": {
        "content": "'\\f102'"
    },
    "flaticon-arrows-3:before": {
        "content": "'\\f103'"
    },
    "flaticon-arrows-4:before": {
        "content": "'\\f104'"
    },
    "flaticon-circle:before": {
        "content": "'\\f105'"
    },
    "flaticon-circle-1:before": {
        "content": "'\\f106'"
    },
    "flaticon-circle-2:before": {
        "content": "'\\f107'"
    },
    "flaticon-close:before": {
        "content": "'\\f108'"
    },
    "flaticon-cross:before": {
        "content": "'\\f109'"
    },
    "flaticon-delete:before": {
        "content": "'\\f10a'"
    },
    "flaticon-shapes:before": {
        "content": "'\\f10b'"
    }
});