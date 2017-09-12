package foodtrakr.foodtrakr;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;

public class Recipes extends AppCompatActivity {

    public ImageButton iInvButton;
    public ImageButton iCalButton;
    public ImageButton iSetButton;
    public ImageButton iRecButton;

    public void initButtonListeners(){
        iRecButton = (ImageButton)findViewById(R.id.recBtn);
        iRecButton.setImageResource(R.drawable.recipes1);

        iInvButton = (ImageButton)findViewById(R.id.invBtn);
        iInvButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Recipes.this, Inventory.class);
                startActivity(intent);
            }
        });
        iCalButton = (ImageButton)findViewById(R.id.calBtn);
        iCalButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Recipes.this, Calendar.class);
                startActivity(intent);
            }
        });
        iSetButton = (ImageButton)findViewById(R.id.setBtn);
        iSetButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Recipes.this, Settings.class);
                startActivity(intent);
            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recipes);
        initButtonListeners();
    }
}
