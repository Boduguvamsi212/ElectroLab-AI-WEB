# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified in the build config.

# Retrofit
-keepattributes Signature
-keepattributes *Annotation*
-keep class retrofit2.** { *; }
-keepclasseswithmembers class * {
    @retrofit2.http.* <methods>;
}

# OkHttp
-dontwarn okhttp3.**
-dontwarn okio.**
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }

# Gson
-keep class com.google.gson.** { *; }
-keepattributes EnclosingMethod
-keep class com.electrolab.corrosion.models.** { *; }

# MPAndroidChart
-keep class com.github.mikephil.charting.** { *; }
