package foodtrakr.foodtrakr;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;

public class Settings extends AppCompatActivity {

    public ImageButton iRecButton;
    public ImageButton iCalButton;
    public ImageButton iInvButton;
    public ImageButton iSetButton;

    public void initButtonListeners(){
        iSetButton = (ImageButton)findViewById(R.id.setBtn);
        iSetButton.setImageResource(R.drawable.settings1);

        iRecButton = (ImageButton)findViewById(R.id.recBtn);
        iRecButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Settings.this, Recipes.class);
                startActivity(intent);
            }
        });
        iCalButton = (ImageButton)findViewById(R.id.calBtn);
        iCalButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Settings.this, Calendar.class);
                startActivity(intent);
            }
        });
        iInvButton = (ImageButton)findViewById(R.id.invBtn);
        iInvButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Settings.this, Inventory.class);
                startActivity(intent);
            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);
        initButtonListeners();
    }
}
