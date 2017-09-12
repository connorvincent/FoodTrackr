package foodtrakr.foodtrakr;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;

public class Inventory extends AppCompatActivity {

    public ImageButton iRecButton;
    public ImageButton iCalButton;
    public ImageButton iSetButton;
    public ImageButton iInvButton;

    public void initButtonListeners(){
        iInvButton = (ImageButton)findViewById(R.id.invBtn);
        iInvButton.setImageResource(R.drawable.clipboard1);

        iRecButton = (ImageButton)findViewById(R.id.recBtn);
        iRecButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Inventory.this, Recipes.class);
                startActivity(intent);
            }
        });
        iCalButton = (ImageButton)findViewById(R.id.calBtn);
        iCalButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Inventory.this, Calendar.class);
                startActivity(intent);
            }
        });
        iSetButton = (ImageButton)findViewById(R.id.setBtn);
        iSetButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Inventory.this, Settings.class);
                startActivity(intent);
            }
        });
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inventory);
        initButtonListeners();
    }
}
