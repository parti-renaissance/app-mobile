package com.fabernovel.jemarche;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;

public class SplashActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);

        // Pass along FCM messages/notifications etc
        // (cf https://github.com/invertase/react-native-firebase/issues/3469#issuecomment-614990736)
        Bundle extras = this.getIntent().getExtras();
        if (extras != null) {
            intent.putExtras(extras);
        }

        startActivity(intent);
        finish();
    }
}
