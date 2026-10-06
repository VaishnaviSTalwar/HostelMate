package wardenly.backend;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/housekeeping")
public class HousekeepingRequestController {

    private final HousekeepingRequestRepository housekeepingRequestRepository;

    public HousekeepingRequestController(
            HousekeepingRequestRepository housekeepingRequestRepository) {
        this.housekeepingRequestRepository = housekeepingRequestRepository;
    }

    @PostMapping
    public HousekeepingRequest createRequest(
            @RequestBody HousekeepingRequest request) {

        return housekeepingRequestRepository.save(request);
    }

    @GetMapping
    public List<HousekeepingRequest> getRequests() {

        return housekeepingRequestRepository.findAll();
    }

    @PutMapping("/{id}/status")
    public HousekeepingRequest updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        HousekeepingRequest request =
                housekeepingRequestRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Housekeeping request not found"));

        request.setStatus(status);

        return housekeepingRequestRepository.save(request);
    }
}