package wardenly.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HousekeepingRequestRepository
        extends JpaRepository<HousekeepingRequest, Long> {
}