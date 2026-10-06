package wardenly.backend;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/mess-menu")
public class MessMenuController {

    private final MessMenuRepository messMenuRepository;

    public MessMenuController(MessMenuRepository messMenuRepository) {
        this.messMenuRepository = messMenuRepository;
    }

    @PostMapping
    public MessMenu createMenu(@RequestBody MessMenu messMenu) {
        return messMenuRepository.save(messMenu);
    }

    @GetMapping
    public List<MessMenu> getMenus() {
        return messMenuRepository.findAll();
    }

    @PutMapping("/{id}")
    public MessMenu updateMenu(
            @PathVariable Long id,
            @RequestBody MessMenu updatedMenu) {

        MessMenu menu = messMenuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found"));

        menu.setDay(updatedMenu.getDay());
        menu.setBreakfast(updatedMenu.getBreakfast());
        menu.setLunch(updatedMenu.getLunch());
        menu.setSnacks(updatedMenu.getSnacks());
        menu.setDinner(updatedMenu.getDinner());

        return messMenuRepository.save(menu);
    }

    @DeleteMapping("/{id}")
    public void deleteMenu(@PathVariable Long id) {
        messMenuRepository.deleteById(id);
    }
}