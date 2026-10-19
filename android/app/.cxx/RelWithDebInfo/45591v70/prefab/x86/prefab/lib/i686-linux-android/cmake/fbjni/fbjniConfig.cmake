if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/home/mid/.gradle/caches/8.13/transforms/f0debad9fe2299a987e8ede101a2f97c/transformed/fbjni-0.7.0/prefab/modules/fbjni/libs/android.x86/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/mid/.gradle/caches/8.13/transforms/f0debad9fe2299a987e8ede101a2f97c/transformed/fbjni-0.7.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

