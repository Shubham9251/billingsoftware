package in.shubham.billingsoftware.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;

import in.shubham.billingsoftware.io.DashboardResponse;
import in.shubham.billingsoftware.io.OrderResponse;
import in.shubham.billingsoftware.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v1.0/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final OrderService orderService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public DashboardResponse getDashboarddata() {
        LocalDate today = LocalDate.now();
        Double todaySale = orderService.sumSalesByDate(today);
        Long todayOrderCount = orderService.countByOrderDate(today);

        List<OrderResponse> recentOrders = orderService.findRecentOrders();

        return new DashboardResponse(
            todaySale != null ? todaySale : 0.0,
            todayOrderCount != null ? todayOrderCount : 0,
            recentOrders
        );
    }
}
