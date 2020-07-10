package br.com.ftt.stockmanager.controller;

import br.com.ftt.stockmanager.dto.stock.StockChangeProductItemRequestDTO;
import br.com.ftt.stockmanager.dto.stock.StockProductResponseDTO;
import br.com.ftt.stockmanager.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/stock")
public class StockController {
    @Autowired
    private StockRepository stockRepository;

    @CrossOrigin
    @PutMapping("/changeAmount/{productId}")
    public ResponseEntity<?> changeStockItem(@PathVariable Long productId, @RequestBody @Valid StockChangeProductItemRequestDTO stockChangeProductItemRequestDTO) {
        var hasProductStock = stockRepository.findByProductId(productId);
        if(hasProductStock.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var product = hasProductStock.get();
        product.setAmount(stockChangeProductItemRequestDTO.getAmount());

        stockRepository.save(product);
        return ResponseEntity.ok().build();
    }

    @CrossOrigin
    @GetMapping("/{productId}")
    public ResponseEntity<StockProductResponseDTO> show(@PathVariable Long productId) {
        var stock = stockRepository.findByProductId(productId);
        if(stock.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(StockProductResponseDTO.parse(stock.get()));
    }

    @CrossOrigin
    @GetMapping
    public List<StockProductResponseDTO> index() {
        var stock = stockRepository.findAll();

        return stock
                .stream()
                .map(StockProductResponseDTO::parse)
                .collect(Collectors.toList());
    }
}
