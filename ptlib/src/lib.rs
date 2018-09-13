//! ptlib is the positron bridge to a native shared or static library

/// provides a touch point for positron state tracking
#[repr(C)]
pub struct PositronContext {
    state: i32
}

impl PositronContext {
    /// create a new context instance
    pub fn new() -> Self {
        PositronContext {
            state: 0
        }
    }

    /// peek the current state of the context instance
    pub fn peek(&self) -> i32 {
        self.state
    }

    /// incr state of the context instance and return it
    pub fn incr(&mut self) -> i32 {
        self.state += 1;
        self.state
    }
}

/// Allocate a new c-api context instance
#[no_mangle]
pub extern "C" fn pt_ctx_alloc() -> *mut PositronContext {
    Box::into_raw(Box::new(PositronContext::new()))
}

/// Free a c-api context instance
#[no_mangle]
pub extern "C" fn pt_ctx_free(ctx: *mut PositronContext) {
    if ctx.is_null() { return }
    unsafe { Box::from_raw(ctx); }
}

/// Peek at the state of a c-api context instance
#[no_mangle]
pub extern "C" fn pt_ctx_peek(ctx: *mut PositronContext) -> i32 {
    let ctx = unsafe {
        assert!(!ctx.is_null());
        &mut *ctx
    };
    ctx.peek()
}

/// Incr and return the state of a c-api context instance
#[no_mangle]
pub extern "C" fn pt_ctx_incr(ctx: *mut PositronContext) -> i32 {
    let ctx = unsafe {
        assert!(!ctx.is_null());
        &mut *ctx
    };
    ctx.incr()
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_starts_at_zero() {
        let ctx = PositronContext::new();
        assert_eq!(0, ctx.peek());
    }

    #[test]
    fn it_incrs_by_one() {
        let mut ctx = PositronContext::new();
        assert_eq!(1, ctx.incr());
    }

    #[test]
    fn it_starts_at_zero_c() {
        let ctx = pt_ctx_alloc();
        assert_eq!(0, pt_ctx_peek(ctx));
        pt_ctx_free(ctx);
    }

    #[test]
    fn it_incrs_by_one_c() {
        let ctx = pt_ctx_alloc();
        assert_eq!(1, pt_ctx_incr(ctx));
        pt_ctx_free(ctx);
    }
}
