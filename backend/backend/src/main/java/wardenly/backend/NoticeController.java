package wardenly.backend;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeRepository noticeRepository;

    public NoticeController(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    @PostMapping
    public Notice createNotice(@RequestBody Notice notice) {
        return noticeRepository.save(notice);
    }

    @GetMapping
    public List<Notice> getNotices() {
        return noticeRepository.findAll();
    }
}