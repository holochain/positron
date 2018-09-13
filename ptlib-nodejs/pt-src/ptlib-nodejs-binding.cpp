#include <errno.h>
#include <string.h>

#include <nan.h>

#include "ptlib.h"

using namespace Nan;

class PositronContextBinding: public ObjectWrap {
  public:
    static NAN_MODULE_INIT(Init) {
      v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
      tpl->SetClassName(Nan::New("PositronContext").ToLocalChecked());
      tpl->InstanceTemplate()->SetInternalFieldCount(1);

      SetPrototypeMethod(tpl, "peek", Peek);
      SetPrototypeMethod(tpl, "incr", Incr);

      constructor().Reset(Nan::GetFunction(tpl).ToLocalChecked());
      Set(target, Nan::New("PositronContext").ToLocalChecked(),
          Nan::GetFunction(tpl).ToLocalChecked());
    }

  private:
    explicit PositronContextBinding() : pt_ctx(NULL) {
      pt_ctx = pt_ctx_alloc();
    }
    ~PositronContextBinding() {
      pt_ctx_free(pt_ctx);
      pt_ctx = NULL;
    }

    static NAN_METHOD(New) {
      if (info.IsConstructCall()) {
        PositronContextBinding *obj = new PositronContextBinding();
        obj->Wrap(info.This());
        info.GetReturnValue().Set(info.This());
      } else {
        const int argc = 1;
        v8::Local<v8::Value> argv[argc] = {info[0]};
        v8::Local<v8::Function> cons = Nan::New(constructor());
        info.GetReturnValue().Set(
            Nan::NewInstance(cons, argc, argv).ToLocalChecked());
      }
    }

    static NAN_METHOD(Peek) {
      PositronContextBinding *obj = ObjectWrap::Unwrap<PositronContextBinding>(info.Holder());
      info.GetReturnValue().Set(pt_ctx_peek(obj->pt_ctx));
    }

    static NAN_METHOD(Incr) {
      PositronContextBinding *obj = ObjectWrap::Unwrap<PositronContextBinding>(info.Holder());
      info.GetReturnValue().Set(pt_ctx_incr(obj->pt_ctx));
    }

    static inline Persistent<v8::Function> & constructor() {
      static Persistent<v8::Function> my_constructor;
      return my_constructor;
    }

    PositronContext *pt_ctx;
};

NODE_MODULE(ptlib, PositronContextBinding::Init)
