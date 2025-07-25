import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomNavigation from './BottomNavigation';
import Navbar from './Navbar';

const API_BASE = 'https://ddbullions.in/api/';

interface Product {
  product_name: string;
  metal: 'gold' | 'silver';
}
interface ProductMargin {
  buy_margin: number;
  sell_margin: number;
  metal: 'gold' | 'silver';
}
interface Rates {
  inr?: { buy?: number; sell?: number };
  gold?: { spot?: { buy?: number; sell?: number }, costing?: { buy?: number; sell?: number } };
  silver?: { spot?: { buy?: number; sell?: number }, costing?: { buy?: number; sell?: number } };
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [goldProducts, setGoldProducts] = useState<Product[]>([]);
  const [silverProducts, setSilverProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [priceHighlights, setPriceHighlights] = useState<{ [key: string]: string }>({});
  const [mantrRates, setMantrRates] = useState<Rates | null>(null);
  const [productMargins, setProductMargins] = useState<{ [key: string]: ProductMargin }>({});
  const [displayPrices, setDisplayPrices] = useState<{ [key: string]: { buy: number; sell: number } }>({});
  const [activeTab, setActiveTab] = useState<'gold' | 'silver' | 'unfix'>('gold');

  useEffect(() => {
    fetch(`${API_BASE}/products`).then(res => res.json()).then(res => {
      if (res.success) {
        setProducts(res.products);
        setGoldProducts(res.products.filter((p: Product) => p.metal === 'gold'));
        setSilverProducts(res.products.filter((p: Product) => p.metal === 'silver'));
      }
    });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/admin/margins`).then(res => res.json()).then(data => {
      if (data.success) {
        const marginsMap: { [key: string]: ProductMargin } = {};
        data.margins.forEach((m: any) => {
          marginsMap[m.product_name] = { buy_margin: Number(m.buy_margin), sell_margin: Number(m.sell_margin), metal: m.metal };
        });
        setProductMargins(marginsMap);
      }
    });
  }, []);

  useEffect(() => {
    const fetchMantrRates = async () => {
      try {
        const res = await fetch(`${API_BASE}/mantrjewels-rates`);
        const data = await res.json();
        console.log("Mantr API Response:", data);
        if (data.success && data.data) {
          console.log("Setting mantr rates:", data.data);
          setMantrRates(data.data);
        } else {
          console.log("API failed or no data");
          setMantrRates(null);
        }
      } catch (error) {
        console.log("API Error:", error);
        setMantrRates(null);
      }
    };
    fetchMantrRates();
    const interval = setInterval(fetchMantrRates, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    
    const newPrices: { [key: string]: { buy: number; sell: number } } = {};
    products.forEach((product: Product) => {
      const buyMargin = productMargins[product.product_name] && typeof productMargins[product.product_name]['buy_margin'] === 'number' ? productMargins[product.product_name]['buy_margin'] : 0;
      const sellMargin = productMargins[product.product_name] && typeof productMargins[product.product_name]['sell_margin'] === 'number' ? productMargins[product.product_name]['sell_margin'] : 0;
      
      // Calculate costing inline
      let buyCosting = 0;
      let sellCosting = 0;
      
      if (productMargins[product.product_name] && productMargins[product.product_name].metal === 'gold') {
        if (mantrRates && mantrRates.gold && mantrRates.gold.costing) {
          buyCosting = Number(mantrRates.gold.costing.buy) || 0;
          sellCosting = Number(mantrRates.gold.costing.sell) || 0;
        }
      } else if (productMargins[product.product_name] && productMargins[product.product_name].metal === 'silver') {
        if (mantrRates && mantrRates.silver && mantrRates.silver.costing) {
          buyCosting = Number(mantrRates.silver.costing.buy) || 0;
          sellCosting = Number(mantrRates.silver.costing.sell) || 0;
        }
      }
      
      newPrices[product.product_name] = {
        buy: buyCosting + buyMargin,
        sell: sellCosting + sellMargin,
      };
    });
    
    setDisplayPrices(newPrices);
  }, [productMargins, mantrRates, products]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <View style={styles.heroLoading}><ActivityIndicator size="large" color="#FFB000" /><Text style={{color: '#ffffff', marginTop: 10}}>Loading...</Text></View>;
  if (error) return <View style={styles.heroLoading}><Text style={{color: '#ffffff'}}>Error: {error}</Text></View>;

  const getCurrentProducts = () => {
    switch (activeTab) {
      case 'gold':
        return goldProducts;
      case 'silver':
        return silverProducts;
      case 'unfix':
        return [...goldProducts, ...silverProducts];
      default:
        return goldProducts;
    }
  };

  const getCurrentMetrics = () => {
    const baseInr = mantrRates?.inr?.buy ?? mantrRates?.inr?.sell ?? 86.448;
    
    if (activeTab === 'gold') {
      const goldSpot = mantrRates?.gold?.spot?.buy ?? mantrRates?.gold?.spot?.sell ?? 3389.68;
      const goldCosting = mantrRates?.gold?.costing?.buy ?? mantrRates?.gold?.costing?.sell ?? 99420;
      
      return {
        spot: goldSpot,
        spotLow: mantrRates?.gold?.spot?.sell ?? goldSpot,
        spotHigh: mantrRates?.gold?.spot?.buy ?? goldSpot,
        inr: baseInr,
        inrLow: mantrRates?.inr?.sell ?? baseInr,
        inrHigh: mantrRates?.inr?.buy ?? baseInr,
        costing: goldCosting,
        costingLow: mantrRates?.gold?.costing?.sell ?? goldCosting,
        costingHigh: mantrRates?.gold?.costing?.buy ?? goldCosting
      };
    } else {
      const silverSpot = mantrRates?.silver?.spot?.buy ?? mantrRates?.silver?.spot?.sell ?? 98880;
      const silverCosting = mantrRates?.silver?.costing?.buy ?? mantrRates?.silver?.costing?.sell ?? 99780;
      
      return {
        spot: silverSpot,
        spotLow: mantrRates?.silver?.spot?.sell ?? silverSpot,
        spotHigh: mantrRates?.silver?.spot?.buy ?? silverSpot,
        inr: baseInr,
        inrLow: mantrRates?.inr?.sell ?? baseInr,
        inrHigh: mantrRates?.inr?.buy ?? baseInr,
        costing: silverCosting,
        costingLow: mantrRates?.silver?.costing?.sell ?? silverCosting,
        costingHigh: mantrRates?.silver?.costing?.buy ?? silverCosting
      };
    }
  };

  const renderTabButton = (tab: 'gold' | 'silver' | 'unfix', label: string) => (
    <TouchableOpacity
      key={tab}
      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productRow}>
      <View style={styles.productInfo}>
        <Text style={styles.productNameText}>
          {item.product_name.toUpperCase().replace('GOLD ', '').replace('SILVER ', '')}
        </Text>
        <Text style={styles.productWeight}>1KG (24th July)</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={[styles.priceText, priceHighlights[item.product_name+'_buy'] === 'green' && styles.priceUp, priceHighlights[item.product_name+'_buy'] === 'red' && styles.priceDown]}>
          {displayPrices[item.product_name]?.buy || 0}
        </Text>
        <Text style={styles.priceSubText}>L : {(displayPrices[item.product_name]?.buy || 0) - 200}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={[styles.priceText, priceHighlights[item.product_name+'_sell'] === 'green' && styles.priceUp, priceHighlights[item.product_name+'_sell'] === 'red' && styles.priceDown]}>
          {displayPrices[item.product_name]?.sell || 0}
        </Text>
        <Text style={styles.priceSubText}>H : {(displayPrices[item.product_name]?.sell || 0) + 200}</Text>
      </View>
    </View>
  );

  const metrics = getCurrentMetrics();

  return (
    <View style={styles.container}>
      <Navbar />
      
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {renderTabButton('gold', 'GOLD RATES')}
        {renderTabButton('silver', 'SILVER RATES')}
      </View>

      {/* Metrics Cards */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>{activeTab === 'gold' ? 'GOLD SPOT' : 'SILVER SPOT'}</Text>
          <Text style={styles.metricValue}>{metrics.spot.toLocaleString()}</Text>
          {/* <Text style={styles.metricRange}>{metrics.spotLow} | {metrics.spotHigh}</Text> */}
        </View>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>INR</Text>
          <Text style={styles.metricValue}>{metrics.inr && typeof metrics.inr === 'number' ? metrics.inr.toString() : '86.448'}</Text>
          {/* <Text style={styles.metricRange}>{metrics.inrLow && typeof metrics.inrLow === 'number' ? metrics.inrLow.toString() : '86.345'} | {metrics.inrHigh && typeof metrics.inrHigh === 'number' ? metrics.inrHigh.toString() : '86.478'}</Text> */}
        </View>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>{activeTab === 'gold' ? 'GOLD COSTING' : 'SILVER COSTING'}</Text>
          <Text style={styles.metricValue}>{metrics.costing.toLocaleString()}</Text>
          {/* <Text style={styles.metricRange}>{metrics.costingLow} | {metrics.costingHigh}</Text> */}
        </View>
      </View>

      {/* Products Section */}
      <View style={styles.productsSection}>
        <View style={styles.productsHeader}>
          <View style={styles.productNameHeader}>
            <Text style={styles.productsHeaderText}>PRODUCTS</Text>
          </View>
          <View style={styles.priceHeader}>
            <Text style={styles.productsHeaderText}>BUY</Text>
          </View>
          <View style={styles.priceHeader}>
            <Text style={styles.productsHeaderText}>SELL</Text>
          </View>
        </View>
        
        <FlatList
          data={getCurrentProducts()}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.product_name}
          style={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>© 2025 DD Bullions All Rights Reserved.</Text>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation activeRoute="home" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  heroLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    marginHorizontal: 0,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRightWidth: 1,
    borderRightColor: '#666666',
  },
  activeTabButton: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#000000',
  },
  metricsContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 8,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 6,
    padding: 12,
    marginHorizontal: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  metricLabel: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 3,
    textAlign: 'center',
  },
  metricValue: {
    color: '#00D4AA',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  metricRange: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '500',
  },
  productsSection: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productsHeader: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    width: '100%',
    alignSelf: 'center',
  },
  productsHeaderText: {
    color: '#bfa14a',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  productNameHeader: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productsList: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  productRow: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productNameText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  productWeight: {
    color: '#888888',
    fontSize: 11,
    marginTop: 2,
  },
  priceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceSubText: {
    color: '#888888',
    fontSize: 10,
    marginTop: 1,
  },
  priceUp: {
    color: '#00ff00',
  },
  priceDown: {
    color: '#ff0000',
  },
  footerContainer: {
    backgroundColor: '#bfa14a',
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#000000',
    fontSize: 11,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  footerSubText: {
    color: '#000000',
    fontSize: 9,
    marginTop: 2,
    fontWeight: '500',
  },
});

export default Home;
