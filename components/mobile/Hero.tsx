import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Footer from './Footer';
import Navbar from './Navbar';

const HIGHLIGHT_DURATION = 700; // ms
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

const MOBILE_BREAKPOINT = 768;

const Home = () => {
  const [spot, setSpot] = useState<{ [key: string]: any }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [goldProducts, setGoldProducts] = useState<Product[]>([]);
  const [silverProducts, setSilverProducts] = useState<Product[]>([]);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [priceHighlights, setPriceHighlights] = useState<{ [key: string]: string }>({});
  const prevPrices = useRef<{ [key: string]: { buy: number; sell: number } }>({});
  const [usdInr, setUsdInr] = useState<number | null>(null);
  const [usdInrError, setUsdInrError] = useState<string>('');
  const [usdInrHighlight, setUsdInrHighlight] = useState<string>('');
  const prevUsdInr = useRef<{ buy: number | null; sell: number | null }>({ buy: null, sell: null });
  const [mantrGoldCosting, setMantrGoldCosting] = useState<any>(null);
  const [mantrGoldCostingError, setMantrGoldCostingError] = useState<string>('');
  const [mantrGoldCostings, setMantrGoldCostings] = useState<any[]>([]);
  const [mantrGoldCostingsError, setMantrGoldCostingsError] = useState<string>('');
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [jwt, setJwt] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [resetToken, setResetToken] = useState<string>('');
  const [resetPassword, setResetPassword] = useState<string>('');
  const [resetStep, setResetStep] = useState<number>(1);
  const [margin, setMargin] = useState<{ gold: number; silver: number }>({ gold: 0, silver: 0 });
  const [marginError, setMarginError] = useState<string>('');
  const [liveRates, setLiveRates] = useState<{ goldProducts: any[]; silverProducts: any[]; goldMargin: number; silverMargin: number }>({ goldProducts: [], silverProducts: [], goldMargin: 0, silverMargin: 0 });
  const [liveRatesError, setLiveRatesError] = useState<string>('');
  const [productMargins, setProductMargins] = useState<{ [key: string]: ProductMargin }>({});
  const [editingMargins, setEditingMargins] = useState<{ [key: string]: any }>({});
  const [mantrRates, setMantrRates] = useState<Rates | null>(null);
  const [mantrRatesError, setMantrRatesError] = useState<string>('');
  const [showMarginModal, setShowMarginModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedSide, setSelectedSide] = useState<'buy' | 'sell'>('buy');
  const [newMarginValue, setNewMarginValue] = useState<number>(0);
  const [marginUpdateSuccess, setMarginUpdateSuccess] = useState<boolean>(false);
  const [marginUpdateError, setMarginUpdateError] = useState<string>('');
  const [displayPrices, setDisplayPrices] = useState<{ [key: string]: { buy: number; sell: number } }>({});
  const [specialHighlights, setSpecialHighlights] = useState<{ [key: string]: string }>({});
  const [specialPrev, setSpecialPrev] = useState<{ [key: string]: any }>({});
  const [usdInrAnim, setUsdInrAnim] = useState<{ buy: boolean; sell: boolean }>({ buy: false, sell: false });

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
        console.log("Mantr", res)
        const data = await res.json();
        if (data.success && data.data) {
          setMantrRates(data.data);
          setMantrRatesError('');
        } else {
          setMantrRates(null);
          setMantrRatesError('Unavailable');
        }
      } catch (err) {
        setMantrRates(null);
        setMantrRatesError('Unavailable');
      }
    };
    fetchMantrRates();
    const interval = setInterval(fetchMantrRates, 3000);
    return () => clearInterval(interval);
  }, []);

  const getLiveCosting = (product: string, side: 'buy' | 'sell'): number => {
    if (productMargins[product] && productMargins[product].metal === 'gold') {
      if (mantrRates && mantrRates.gold && mantrRates.gold.costing) {
        return Number(mantrRates.gold.costing[side]) || 0;
      }
      return 0;
    } else if (productMargins[product] && productMargins[product].metal === 'silver') {
      if (mantrRates && mantrRates.silver && mantrRates.silver.costing) {
        return Number(mantrRates.silver.costing[side]) || 0;
      }
      return 0;
    }
    return 0;
  };

  const getProductPrice = (product: string, side: 'buy' | 'sell'): number => {
    const margin = productMargins[product] && typeof productMargins[product][`${side}_margin`] === 'number' ? productMargins[product][`${side}_margin`] : 0;
    const costing = getLiveCosting(product, side);
    return costing + margin;
  };

  useEffect(() => {
    const newPrices: { [key: string]: { buy: number; sell: number } } = {};
    products.forEach((product: Product) => {
      newPrices[product.product_name] = {
        buy: getProductPrice(product.product_name, 'buy'),
        sell: getProductPrice(product.product_name, 'sell'),
      };
    });
    const highlights: { [key: string]: string } = {};
    Object.keys(newPrices).forEach((product: string) => {
      if (displayPrices[product]) {
        if (newPrices[product].buy !== displayPrices[product].buy) {
          highlights[product + '_buy'] = newPrices[product].buy > displayPrices[product].buy ? 'green' : 'red';
          setTimeout(() => {
            setPriceHighlights(h => ({ ...h, [product + '_buy']: '' }));
          }, HIGHLIGHT_DURATION);
        }
        if (newPrices[product].sell !== displayPrices[product].sell) {
          highlights[product + '_sell'] = newPrices[product].sell > displayPrices[product].sell ? 'green' : 'red';
          setTimeout(() => {
            setPriceHighlights(h => ({ ...h, [product + '_sell']: '' }));
          }, HIGHLIGHT_DURATION);
        }
      }
    });
    setPriceHighlights(h => ({ ...h, ...highlights }));
    setDisplayPrices(newPrices);
  }, [productMargins, mantrRates]);

  useEffect(() => {
    const newSpecial: { [key: string]: any } = {};
    if (mantrRates && mantrRates.inr) {
      newSpecial['usdInr'] = mantrRates.inr.buy ?? mantrRates.inr.sell;
    }
    if (mantrRates && mantrRates.gold && mantrRates.gold.spot) {
      newSpecial['goldSpotBuy'] = mantrRates.gold.spot.buy ?? mantrRates.gold.spot.sell;
    }
    if (mantrRates && mantrRates.gold && mantrRates.gold.costing) {
      newSpecial['goldCostingBuy'] = mantrRates.gold.costing.buy ?? mantrRates.gold.costing.sell;
    }
    if (mantrRates && mantrRates.silver && mantrRates.silver.spot) {
      newSpecial['silverSpotBuy'] = mantrRates.silver.spot.buy ?? mantrRates.silver.spot.sell;
    }
    if (mantrRates && mantrRates.silver && mantrRates.silver.costing) {
      newSpecial['silverCostingBuy'] = mantrRates.silver.costing.buy ?? mantrRates.silver.costing.sell;
    }
    const highlights: { [key: string]: string } = {};
    Object.keys(newSpecial).forEach((key: string) => {
      if (specialPrev[key] !== undefined && newSpecial[key] !== specialPrev[key]) {
        if (Number(newSpecial[key]) > Number(specialPrev[key])) highlights[key] = 'green';
        else if (Number(newSpecial[key]) < Number(specialPrev[key])) highlights[key] = 'red';
        setTimeout(() => {
          setSpecialHighlights(h => ({ ...h, [key]: '' }));
        }, HIGHLIGHT_DURATION);
      }
    });
    setSpecialHighlights(h => ({ ...h, ...highlights }));
    setSpecialPrev(newSpecial);
  }, [mantrRates]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const SpecialCard = ({ label, value, highlight }: { label: string; value: number | string | undefined; highlight: string }) => (
    <View style={[styles.specialCard, highlight === 'green' && styles.specialCardUp, highlight === 'red' && styles.specialCardDown]}>
      <Text style={styles.specialCardLabel}>{label}</Text>
      <Text style={styles.specialCardValue}>{value ?? '-'}</Text>
    </View>
  );

  const renderProductRow = (product: Product, isGold: boolean) => (
    <View key={product.product_name} style={styles.rateRow}>
      <Text style={styles.productName}>{product.product_name}</Text>
      <Text style={[styles.priceCell, priceHighlights[product.product_name+'_buy'] === 'green' && styles.priceUp, priceHighlights[product.product_name+'_buy'] === 'red' && styles.priceDown]}>
        {displayPrices[product.product_name]?.buy}
        {typeof productMargins[product.product_name]?.buy_margin === 'number' && productMargins[product.product_name]?.buy_margin !== 0 && (
          <Text style={styles.marginGold}>{productMargins[product.product_name].buy_margin > 0 ? `+${productMargins[product.product_name].buy_margin}` : `-${Math.abs(productMargins[product.product_name].buy_margin)}`}</Text>
        )}
      </Text>
      <Text style={[styles.priceCell, priceHighlights[product.product_name+'_sell'] === 'green' && styles.priceUp, priceHighlights[product.product_name+'_sell'] === 'red' && styles.priceDown]}>
        {displayPrices[product.product_name]?.sell}
        {typeof productMargins[product.product_name]?.sell_margin === 'number' && productMargins[product.product_name]?.sell_margin !== 0 && (
          <Text style={styles.marginGold}>{productMargins[product.product_name].sell_margin > 0 ? `+${productMargins[product.product_name].sell_margin}` : `-${Math.abs(productMargins[product.product_name].sell_margin)}`}</Text>
        )}
      </Text>
    </View>
  );

  if (loading) return <View style={styles.heroLoading}><ActivityIndicator size="large" color="#bfa14a" /><Text>Loading...</Text></View>;
  if (error) return <View style={styles.heroLoading}><Text>Error: {error}</Text></View>;

  return (
    <ScrollView style={styles.heroSection} contentContainerStyle={{ alignItems: 'center' }}>
      <Navbar />
      {/* Special Cards Row - Gold */}
      <View style={styles.specialCardsRow}>
        <SpecialCard label="USD/INR" value={mantrRates?.inr?.buy ?? mantrRates?.inr?.sell} highlight={specialHighlights['usdInr']} />
        <SpecialCard label="Gold Spot" value={mantrRates?.gold?.spot?.buy ?? mantrRates?.gold?.spot?.sell} highlight={specialHighlights['goldSpotBuy']} />
        <SpecialCard label="Gold Costing" value={mantrRates?.gold?.costing?.buy ?? mantrRates?.gold?.costing?.sell} highlight={specialHighlights['goldCostingBuy']} />
      </View>
      {/* Gold Products Table */}
      <Text style={styles.productsTitle}>Gold Products</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>PRODUCT</Text>
        <Text style={styles.headerCell}>BUY</Text>
        <Text style={styles.headerCell}>SELL</Text>
      </View>
      {goldProducts.map((product: Product) => renderProductRow(product, true))}
      {/* Special Cards Row - Silver */}
      <View style={styles.specialCardsRow}>
        <SpecialCard label="USD/INR" value={mantrRates?.inr?.buy ?? mantrRates?.inr?.sell} highlight={specialHighlights['usdInr']} />
        <SpecialCard label="Silver Spot" value={mantrRates?.silver?.spot?.buy ?? mantrRates?.silver?.spot?.sell} highlight={specialHighlights['silverSpotBuy']} />
        <SpecialCard label="Silver Costing" value={mantrRates?.silver?.costing?.buy ?? mantrRates?.silver?.costing?.sell} highlight={specialHighlights['silverCostingBuy']} />
      </View>
      {/* Silver Products Table */}
      <Text style={styles.productsTitle}>Silver Products</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>PRODUCT</Text>
        <Text style={styles.headerCell}>BUY</Text>
        <Text style={styles.headerCell}>SELL</Text>
      </View>
      {silverProducts.map((product: Product) => renderProductRow(product, false))}
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: '#121212',
    minHeight: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop:10
  },
  heroLoading: {
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  specialCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 18,
    marginTop: 20, // Added margin from top
  },
  specialCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 18,
    minWidth: 110,
    width: '30%', // Added to allow wrapping
    alignItems: 'center',
    marginHorizontal: 6,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#bfa14a',
    shadowColor: '#bfa14a',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  specialCardUp: {
    backgroundColor: '#2e7d32',
  },
  specialCardDown: {
    backgroundColor: '#b71c1c',
  },
  specialCardLabel: {
    fontWeight: '700',
    color: '#bfa14a',
    fontSize: 15,
    marginBottom: 4,
  },
  specialCardValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginTop: 2,
  },
  productsTitle: {
    fontWeight: '700',
    color: '#bfa14a',
    fontSize: 28,
    marginBottom: 4,
    marginTop: 10,
    alignSelf: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 6,
    paddingVertical: 8,
    paddingHorizontal: 4,
    justifyContent: 'space-between',
  },
  headerCell: {
    color: '#bfa14a',
    fontWeight: '700',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  rateRow: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productName: {
    flex: 1,
    color: '#e0e0e0',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
  },
  priceCell: {
    flex: 1,
    color: '#e0e0e0',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  priceUp: {
    color: '#1db954',
    fontWeight: 'bold',
    backgroundColor: 'rgba(22, 163, 74, 0.2)',
  },
  priceDown: {
    color: '#e53935',
    fontWeight: 'bold',
    backgroundColor: 'rgba(225, 29, 72, 0.2)',
  },
  marginGold: {
    backgroundColor: '#fbbf24',
    color: '#181818',
    fontWeight: '700',
    borderRadius: 6,
    paddingHorizontal: 8,
    marginLeft: 8,
    fontSize: 13,
  },
});

export default Home; 