package wardenly.backend;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    private final LeaveRequestRepository leaveRequestRepository;

    public LeaveRequestController(LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }

    @PostMapping
    public LeaveRequest createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        return leaveRequestRepository.save(leaveRequest);
    }

    @GetMapping
    public List<LeaveRequest> getLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    @PutMapping("/{id}/status")
    public LeaveRequest updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        LeaveRequest leaveRequest = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        leaveRequest.setStatus(status);

        return leaveRequestRepository.save(leaveRequest);
    }
}