package host.holo.ptlib;

import java.util.TimeZone;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.provider.Settings;

public class PTLib extends CordovaPlugin {
    public static final String TAG = "PTLib";

    private PositronContext _ctx;

    /**
     * Constructor.
     */
    public PTLib() {
      this._ctx = new PositronContext();
    }

    /**
     * Sets the context of the Command. This can then be used to do things like
     * get file paths associated with the Activity.
     *
     * @param cordova The context of the main Activity.
     * @param webView The CordovaWebView Cordova is running in.
     */
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArry of arguments for the plugin.
     * @param callbackContext   The callback id used when calling back into JavaScript.
     * @return                  True if the action was valid, false if not.
     */
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("call".equals(action)) {
          String method = args.getJSONObject(0).getString("method");
          if ("initialize".equals(method)) {
            JSONObject s = new JSONObject();
            s.put("response", "ready");
            callbackContext.success(s);
          } else if ("peek".equals(method)) {
            JSONObject s = new JSONObject();
            s.put("state", this._ctx.peek());
            JSONObject r = new JSONObject();
            r.put("response", s);
            callbackContext.success(r);
          } else if ("incr".equals(method)) {
            JSONObject s = new JSONObject();
            s.put("state", this._ctx.incr());
            JSONObject r = new JSONObject();
            r.put("response", s);
            callbackContext.success(r);
          } else {
            return false;
          }
        } else {
          return false;
        }
        return true;
    }
}
