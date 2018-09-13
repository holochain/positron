package host.holo.ptlib;

public class PositronContext {
    private boolean isDestroyed = false;
    private long ctx;

    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("ptlib-android-binding");
    }

    private native long ptCtxAlloc();
    private native void ptCtxFree(long ptr);
    private native int ptCtxPeek(long ptr);
    private native int ptCtxIncr(long ptr);

    public PositronContext() {
        this.ctx = ptCtxAlloc();
    }

    public void destroy() {
        if (this.isDestroyed) {
            return;
        }
        this.isDestroyed = true;
        ptCtxFree(this.ctx);
    }

    private void checkDestroyed() {
        if (this.isDestroyed) {
            throw new RuntimeException("Cannot invoke method on destroyed instance");
        }
    }

    public int peek() {
        this.checkDestroyed();
        return this.ptCtxPeek(this.ctx);
    }

    public int incr() {
        this.checkDestroyed();
        return this.ptCtxIncr(this.ctx);
    }
}
