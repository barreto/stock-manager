package br.com.ftt.stockmanager.controller;

import br.com.ftt.stockmanager.dto.product.ProductDetailsResponseDTO;
import br.com.ftt.stockmanager.dto.product.ProductRequestDTO;
import br.com.ftt.stockmanager.dto.product.ProductResponseDTO;
import br.com.ftt.stockmanager.model.Product;
import br.com.ftt.stockmanager.model.Stock;
import br.com.ftt.stockmanager.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private StockRepository stockRepository;

    @CrossOrigin
    @GetMapping
    public List<ProductResponseDTO> index() {
        var product = productRepository.findAll();

        return product
                .stream()
                .map(ProductResponseDTO::parse)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailsResponseDTO> show(@PathVariable Long id) {
        var product = productRepository.findById(id);
        if(!product.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(ProductDetailsResponseDTO.parse(product.get()));
    }

    @CrossOrigin
    @PostMapping
    @Transactional
    public ResponseEntity<ProductDetailsResponseDTO> store(@RequestBody @Valid ProductRequestDTO productToInsert, UriComponentsBuilder uriComponentsBuilder) {
        var product = new Product();

        var category = categoryRepository.findById(productToInsert.getCategoryId());
        if(!category.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        var brand = brandRepository.findById(productToInsert.getBrandId());
        if(!brand.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        var provider = providerRepository.findById(productToInsert.getProviderId());
        if(!provider.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        product.setName(productToInsert.getName());
        product.setDescription(productToInsert.getDescription());
        product.setPrice(productToInsert.getPrice());

        product.setBrand(brand.get());
        product.setCategory(category.get());
        product.setProvider(provider.get());

        productRepository.save(product);

        var stock = new Stock();

        stock.setProduct(product);
        stock.setAmount(productToInsert.getAmount());

        stockRepository.save(stock);

        var uri = uriComponentsBuilder
                .path("/product/{id}")
                .buildAndExpand(product.getId())
                .toUri();
        return ResponseEntity.created(uri).body(ProductDetailsResponseDTO.parse(product));
    }

    @CrossOrigin
    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<ProductDetailsResponseDTO> update(@PathVariable Long id, @RequestBody @Valid ProductRequestDTO productToUpdate) {
        var hasProduct = productRepository.findById(id);
        if(hasProduct.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        var category = categoryRepository.findById(productToUpdate.getCategoryId());
        if(category.isEmpty()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        var brand = brandRepository.findById(productToUpdate.getBrandId());
        if(brand.isEmpty()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        var provider = providerRepository.findById(productToUpdate.getProviderId());
        if(provider.isEmpty()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        var product = hasProduct.get();

        product.setName(productToUpdate.getName());
        product.setDescription(productToUpdate.getDescription());
        product.setPrice(productToUpdate.getPrice());

        product.setBrand(brand.get());
        product.setCategory(category.get());
        product.setProvider(provider.get());

        productRepository.save(product);

        return ResponseEntity.ok(ProductDetailsResponseDTO.parse(product));
    }

    @CrossOrigin
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable Long id) {
        var hasProduct = productRepository.findById(id);
        if(!hasProduct.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        stockRepository.deleteByProductId(id);
        productRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }
}
