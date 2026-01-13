if(NOT TARGET react-native-reanimated::reanimated)
add_library(react-native-reanimated::reanimated SHARED IMPORTED)
set_target_properties(react-native-reanimated::reanimated PROPERTIES
    IMPORTED_LOCATION "C:/Users/amatek/Desktop/apps_dev/DizadCodeTest/node_modules/react-native-reanimated/android/build/intermediates/cxx/RelWithDebInfo/1a2h5i3e/obj/arm64-v8a/libreanimated.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/amatek/Desktop/apps_dev/DizadCodeTest/node_modules/react-native-reanimated/android/build/prefab-headers/reanimated"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

