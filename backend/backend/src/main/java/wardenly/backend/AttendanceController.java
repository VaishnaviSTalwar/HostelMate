package wardenly.backend;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;

    public AttendanceController(
            AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    @PostMapping
    public Attendance createAttendance(
            @RequestBody Attendance attendance) {

        return attendanceRepository.save(attendance);
    }

    @GetMapping
    public List<Attendance> getAttendance() {

        return attendanceRepository.findAll();
    }
}