package foodtrakr.foodtrakr;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;

public class Calendar extends AppCompatActivity {

    public ImageButton iRecButton;
    public ImageButton iInvButton;
    public ImageButton iSetButton;
    public ImageButton iCalButton;

    public void initButtonListeners(){
        iCalButton = (ImageButton)findViewById(R.id.calBtn);
        iCalButton.setImageResource(R.drawable.calendar1);

        iRecButton = (ImageButton)findViewById(R.id.recBtn);
        iRecButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Calendar.this, Recipes.class);
                startActivity(intent);
            }
        });
        iInvButton = (ImageButton)findViewById(R.id.invBtn);
        iInvButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Calendar.this, Inventory.class);
                startActivity(intent);
            }
        });
        iSetButton = (ImageButton)findViewById(R.id.setBtn);
        iSetButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Calendar.this, Settings.class);
                startActivity(intent);
            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calendar);
        initButtonListeners();
    }
}
