package host.holo.ptlibtest;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import host.holo.ptlib.PositronContext;

public class TestActivity extends AppCompatActivity {
    private TextView tv;
    private PositronContext ptCtx;

    private void showState() {
        tv.setText("current value: " + ptCtx.peek());
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        this.ptCtx = new PositronContext();

        tv = findViewById(R.id.state_display);

        Button b = findViewById(R.id.button);
        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TestActivity.this.ptCtx.incr();
                TestActivity.this.showState();
            }
        });

        this.showState();
    }

    @Override
    protected void onDestroy() {
        ptCtx.destroy();
        super.onDestroy();
    }
}
