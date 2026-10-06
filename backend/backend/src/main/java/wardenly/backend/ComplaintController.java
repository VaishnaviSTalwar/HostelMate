package wardenly.backend;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintRepository complaintRepository;

    public ComplaintController(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @PostMapping
    public Complaint createComplaint(
            @RequestBody Complaint complaint) {

        return complaintRepository.save(complaint);
    }

    @GetMapping
    public List<Complaint> getComplaints() {

        return complaintRepository.findAll();
    }

    @PutMapping("/{id}/status")
    public Complaint updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Complaint complaint =
                complaintRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Complaint not found"));

        complaint.setStatus(status);

        return complaintRepository.save(complaint);
    }
}