package wardenly.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MessMenu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String day;
    private String breakfast;
    private String lunch;
    private String snacks;
    private String dinner;

    public MessMenu() {
    }

    public MessMenu(
            String day,
            String breakfast,
            String lunch,
            String snacks,
            String dinner) {

        this.day = day;
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.snacks = snacks;
        this.dinner = dinner;
    }

    public Long getId() {
        return id;
    }

    public String getDay() {
        return day;
    }

    public String getBreakfast() {
        return breakfast;
    }

    public String getLunch() {
        return lunch;
    }

    public String getSnacks() {
        return snacks;
    }

    public String getDinner() {
        return dinner;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public void setBreakfast(String breakfast) {
        this.breakfast = breakfast;
    }

    public void setLunch(String lunch) {
        this.lunch = lunch;
    }

    public void setSnacks(String snacks) {
        this.snacks = snacks;
    }

    public void setDinner(String dinner) {
        this.dinner = dinner;
    }
}