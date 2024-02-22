package kr.cl.forU.product.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.cl.forU.product.model.service.ProductService;
import kr.cl.forU.product.model.vo.Product;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	ProductService service;
    
	
    /**
     * 상품들 조회
     * @param cateSub 필터를 걸 서브 카테고리 값
	 * @return 조회된 상품 리스트
	 */
    @GetMapping("list")
    public List<Product> selectProductList(@RequestParam Map<String, String> m) {
    	if(m.get("cateMain") == null) m.put("cateMain", "0");
    	if(m.get("cateSub") == null) m.put("cateSub", "0");
    	
    	return service.selectProductList(m);
    }
    
    @GetMapping("/")
    public List<Product> bestProducts(){
    	return service.bestProducts();
    }
    
    @GetMapping("CartList")
    public List<Product> selectCartList() {
    	return service.selectCartList();
    }
    
}

