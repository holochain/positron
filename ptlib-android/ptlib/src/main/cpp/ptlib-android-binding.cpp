//
// Created by neonphog on 9/13/18.
//

#include "ptlib.h"

#include <jni.h>
#include <string>

extern "C" JNIEXPORT jstring
JNICALL
Java_host_holo_ptlib_PositronContext_testFunction(
        JNIEnv *env,
        jobject /* this */) {
    std::string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}

extern "C" JNIEXPORT
jlong JNICALL Java_host_holo_ptlib_PositronContext_ptCtxAlloc(
        JNIEnv *env,
        jobject /* this */) {
    return (jlong) pt_ctx_alloc();
}

extern "C" JNIEXPORT
void JNICALL Java_host_holo_ptlib_PositronContext_ptCtxFree(
        JNIEnv *env,
        jobject /* this */,
        jlong ptr) {
    pt_ctx_free((PositronContext *) ptr);
}

extern "C" JNIEXPORT
jint JNICALL Java_host_holo_ptlib_PositronContext_ptCtxPeek(
        JNIEnv *env,
        jobject /* this */,
        jlong ptr) {
    return (jint) pt_ctx_peek((PositronContext *) ptr);
}

extern "C" JNIEXPORT
jint JNICALL Java_host_holo_ptlib_PositronContext_ptCtxIncr(
        JNIEnv *env,
        jobject /* this */,
        jlong ptr) {
    return (jint) pt_ctx_incr((PositronContext *) ptr);
}