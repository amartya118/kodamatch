import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar as NativeStatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type TabKey = 'discover' | 'verify' | 'inbox' | 'profile';

type FormState = {
  fullName: string;
  age: string;
  location: string;
  profession: string;
  relationshipIntent: string;
  mannePeda: string;
  nativePlace: string;
  familyBackground: string;
  consentConfirmed: boolean;
};

type MatchCard = {
  id: number;
  name: string;
  age: number;
  location: string;
  title: string;
  intent: string;
  compatibility: string;
  verified: boolean;
};

const relationshipOptions = ['Dating', 'Serious relationship', 'Marriage'];

const sampleMatches: MatchCard[] = [
  {
    id: 1,
    name: 'Ammu',
    age: 28,
    location: 'Bengaluru',
    title: 'Product designer who loves hockey and family festivals',
    intent: 'Serious relationship',
    compatibility: 'Shared Kodava roots, similar family values, and matching lifestyle preferences.',
    verified: true,
  },
  {
    id: 2,
    name: 'Kushal',
    age: 31,
    location: 'Mysuru',
    title: 'Entrepreneur who enjoys travel, coffee estates, and weekend treks',
    intent: 'Marriage',
    compatibility: 'High trust score with complete identity, manne peda, and intent verification.',
    verified: true,
  },
  {
    id: 3,
    name: 'Muthamma',
    age: 26,
    location: 'Kodagu',
    title: 'Doctor looking for a rooted, respectful, long-term connection',
    intent: 'Dating',
    compatibility: 'Common native place and aligned expectations around family involvement.',
    verified: false,
  },
];

const inboxPreview = [
  {
    name: 'Ammu',
    message: 'Hi! I liked that you included your native place and festival traditions.',
    time: '2m ago',
  },
  {
    name: 'Kushal',
    message: 'Would love to hear more about your family’s Kodava wedding customs.',
    time: '1h ago',
  },
];

const emptyForm: FormState = {
  fullName: '',
  age: '',
  location: '',
  profession: '',
  relationshipIntent: 'Serious relationship',
  mannePeda: '',
  nativePlace: '',
  familyBackground: '',
  consentConfirmed: false,
};

function Pill({
  key,
  label,
  active,
  onPress,
}: {
  key?: string;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      key={key}
      onPress={onPress}
      style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}
    >
      <Text style={[styles.pillLabel, active ? styles.pillLabelActive : styles.pillLabelInactive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${Math.max(progress, 4)}%` }]} />
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('discover');
  const [form, setForm] = useState<FormState>(emptyForm);
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);

  const verificationChecks = useMemo(
    () => [
      Boolean(form.fullName && form.age && form.location),
      Boolean(form.profession && form.relationshipIntent),
      Boolean(form.mannePeda && form.nativePlace),
      Boolean(form.familyBackground && form.consentConfirmed),
    ],
    [form],
  );

  const verificationProgress =
    (verificationChecks.filter(Boolean).length / verificationChecks.length) * 100;

  const completionLabel =
    verificationProgress === 100 && verificationSubmitted
      ? 'Fully verified'
      : verificationProgress >= 50
        ? 'In review'
        : 'Verification pending';

  const updateForm = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const renderDiscover = () => (
    <View style={styles.sectionStack}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>KODAMATCH</Text>
        <Text style={styles.heroTitle}>Meaningful Kodava connections with built-in trust.</Text>
        <Text style={styles.heroBody}>
          Browse verified profiles, review shared family values, and only match after identity and
          manne peda checks are complete.
        </Text>
        <View style={styles.heroStatRow}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>92%</Text>
            <Text style={styles.heroStatLabel}>verified profiles</Text>
          </View>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>3-step</Text>
            <Text style={styles.heroStatLabel}>trust workflow</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Suggested matches</Text>
        <Text style={styles.sectionSubtitle}>Curated based on intent, location, and community fit.</Text>
      </View>

      {sampleMatches.map((match) => (
        <View key={match.id} style={styles.matchCard}>
          <View style={styles.matchHeader}>
            <View>
              <Text style={styles.matchName}>
                {match.name}, {match.age}
              </Text>
              <Text style={styles.matchMeta}>
                {match.location} • {match.intent}
              </Text>
            </View>
            <View style={[styles.badge, match.verified ? styles.badgeVerified : styles.badgeMuted]}>
              <Text style={styles.badgeLabel}>{match.verified ? 'Verified' : 'Pending'}</Text>
            </View>
          </View>

          <Text style={styles.matchTitle}>{match.title}</Text>
          <Text style={styles.matchCompatibility}>{match.compatibility}</Text>
          <View style={styles.matchActions}>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonLabel}>View profile</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonLabel}>Save</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );

  const renderVerify = () => (
    <View style={styles.sectionStack}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Complete verification</Text>
        <Text style={styles.sectionSubtitle}>
          Every member must confirm basic info, manne peda, and relationship intent before matching.
        </Text>
      </View>

      <View style={styles.verificationCard}>
        <View style={styles.verificationHeader}>
          <Text style={styles.verificationTitle}>{completionLabel}</Text>
          <Text style={styles.verificationMeta}>{Math.round(verificationProgress)}% complete</Text>
        </View>
        <ProgressBar progress={verificationProgress} />
        <Text style={styles.verificationCopy}>
          Profiles with complete community verification are surfaced more often in Discover and can
          start conversations instantly.
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formSectionTitle}>1. Basic details</Text>
        <TextInput
          value={form.fullName}
          onChangeText={(text: string) => updateForm('fullName', text)}
          placeholder="Full name"
          placeholderTextColor="#8A8C96"
          style={styles.input}
        />
        <TextInput
          value={form.age}
          onChangeText={(text: string) => updateForm('age', text)}
          placeholder="Age"
          placeholderTextColor="#8A8C96"
          keyboardType="number-pad"
          style={styles.input}
        />
        <TextInput
          value={form.location}
          onChangeText={(text: string) => updateForm('location', text)}
          placeholder="Current city"
          placeholderTextColor="#8A8C96"
          style={styles.input}
        />
        <TextInput
          value={form.profession}
          onChangeText={(text: string) => updateForm('profession', text)}
          placeholder="Profession"
          placeholderTextColor="#8A8C96"
          style={styles.input}
        />
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formSectionTitle}>2. Relationship intent</Text>
        <View style={styles.pillRow}>
          {relationshipOptions.map((option) => (
            <Pill
              key={option}
              label={option}
              active={form.relationshipIntent === option}
              onPress={() => updateForm('relationshipIntent', option)}
            />
          ))}
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formSectionTitle}>3. Kodava community details</Text>
        <TextInput
          value={form.mannePeda}
          onChangeText={(text: string) => updateForm('mannePeda', text)}
          placeholder="Manne peda (house name)"
          placeholderTextColor="#8A8C96"
          style={styles.input}
        />
        <TextInput
          value={form.nativePlace}
          onChangeText={(text: string) => updateForm('nativePlace', text)}
          placeholder="Native place"
          placeholderTextColor="#8A8C96"
          style={styles.input}
        />
        <TextInput
          value={form.familyBackground}
          onChangeText={(text: string) => updateForm('familyBackground', text)}
          placeholder="Family background / traditions"
          placeholderTextColor="#8A8C96"
          multiline
          style={[styles.input, styles.multilineInput]}
        />
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formSectionTitle}>4. Consent and review</Text>
        <Pressable
          onPress={() => updateForm('consentConfirmed', !form.consentConfirmed)}
          style={styles.checkboxRow}
        >
          <View style={[styles.checkbox, form.consentConfirmed && styles.checkboxChecked]}>
            {form.consentConfirmed ? <View style={styles.checkboxDot} /> : null}
          </View>
          <Text style={styles.checkboxText}>
            I confirm my details are accurate and agree to KodaMatch verification review.
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.primaryButton,
            verificationProgress < 100 ? styles.buttonDisabled : null,
          ]}
          disabled={verificationProgress < 100}
          onPress={() => setVerificationSubmitted(true)}
        >
          <Text style={styles.primaryButtonLabel}>
            {verificationSubmitted ? 'Submitted for review' : 'Submit verification'}
          </Text>
        </Pressable>
      </View>
    </View>
  );

  const renderInbox = () => (
    <View style={styles.sectionStack}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Inbox</Text>
        <Text style={styles.sectionSubtitle}>
          Messaging is enabled only after verification is complete.
        </Text>
      </View>

      {inboxPreview.map((thread) => (
        <View key={thread.name} style={styles.threadCard}>
          <View style={styles.threadAvatar}>
            <Text style={styles.threadAvatarLabel}>{thread.name.slice(0, 1)}</Text>
          </View>
          <View style={styles.threadContent}>
            <View style={styles.threadHeader}>
              <Text style={styles.threadName}>{thread.name}</Text>
              <Text style={styles.threadTime}>{thread.time}</Text>
            </View>
            <Text style={styles.threadMessage}>{thread.message}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderProfile = () => (
    <View style={styles.sectionStack}>
      <View style={styles.profileHeaderCard}>
        <Text style={styles.sectionTitle}>Your profile</Text>
        <Text style={styles.profileName}>{form.fullName || 'Create your KodaMatch profile'}</Text>
        <Text style={styles.profileMeta}>
          {form.location || 'Add your city'} • {form.relationshipIntent}
        </Text>
        <View style={styles.profileBadgeRow}>
          <View style={[styles.badge, styles.badgeVerified]}>
            <Text style={styles.badgeLabel}>{completionLabel}</Text>
          </View>
          <View style={[styles.badge, styles.badgeMuted]}>
            <Text style={styles.badgeLabel}>{form.mannePeda || 'Manne peda missing'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.profileInfoCard}>
        <Text style={styles.formSectionTitle}>Profile snapshot</Text>
        <Text style={styles.profileInfoLine}>Profession: {form.profession || 'Not added yet'}</Text>
        <Text style={styles.profileInfoLine}>Native place: {form.nativePlace || 'Not added yet'}</Text>
        <Text style={styles.profileInfoLine}>
          Family details: {form.familyBackground || 'Add traditions and background'}
        </Text>
      </View>

      <View style={styles.profileInfoCard}>
        <Text style={styles.formSectionTitle}>Trust promise</Text>
        <Text style={styles.profileParagraph}>
          KodaMatch surfaces community-specific fields like manne peda to support respectful,
          transparent introductions while keeping the experience modern and private.
        </Text>
      </View>
    </View>
  );

  const screens: Record<TabKey, JSX.Element> = {
    discover: renderDiscover(),
    verify: renderVerify(),
    inbox: renderInbox(),
    profile: renderProfile(),
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.appShell}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {screens[activeTab]}
        </ScrollView>

        <View style={styles.tabBar}>
          {[
            { key: 'discover', label: 'Discover' },
            { key: 'verify', label: 'Verify' },
            { key: 'inbox', label: 'Inbox' },
            { key: 'profile', label: 'Profile' },
          ].map((tab) => {
            const typedKey = tab.key as TabKey;
            const active = activeTab === typedKey;

            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(typedKey)}
                style={styles.tabItem}
              >
                <Text style={[styles.tabLabel, active ? styles.tabLabelActive : null]}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const colors = {
  background: '#4B1715',
  panel: '#FFF7F4',
  primary: '#7A302A',
  accent: '#D8935B',
  text: '#251717',
  textMuted: '#705E5D',
  border: '#E7D5D0',
  white: '#FFFFFF',
  success: '#276749',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: NativeStatusBar.currentHeight ?? 0,
  },
  appShell: {
    flex: 1,
    backgroundColor: colors.panel,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  sectionStack: {
    gap: 16,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 20,
    gap: 12,
  },
  eyebrow: {
    color: '#F7D7C4',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  heroBody: {
    color: '#FDEDE6',
    fontSize: 15,
    lineHeight: 22,
  },
  heroStatRow: {
    flexDirection: 'row',
    gap: 12,
  },
  heroStat: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 18,
    padding: 14,
    gap: 4,
  },
  heroStatValue: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  heroStatLabel: {
    color: '#FDEDE6',
    fontSize: 13,
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  matchCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  matchName: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  matchMeta: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  matchTitle: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  matchCompatibility: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  badgeVerified: {
    backgroundColor: '#E4F3EA',
  },
  badgeMuted: {
    backgroundColor: '#F8E7DE',
  },
  badgeLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  matchActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonLabel: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryButton: {
    minWidth: 92,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8F4',
  },
  secondaryButtonLabel: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  verificationCard: {
    backgroundColor: '#FFF0E8',
    borderRadius: 20,
    padding: 18,
    gap: 10,
  },
  verificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  verificationTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  verificationMeta: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  verificationCopy: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#F6D7C5',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formSectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.text,
    fontSize: 15,
    backgroundColor: '#FFFCFB',
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pillActive: {
    backgroundColor: colors.primary,
  },
  pillInactive: {
    backgroundColor: '#F7E8E1',
  },
  pillLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  pillLabelActive: {
    color: colors.white,
  },
  pillLabelInactive: {
    color: colors.primary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    backgroundColor: '#FFF8F4',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
  checkboxText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  threadCard: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  threadAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F8E7DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  threadAvatarLabel: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 18,
  },
  threadContent: {
    flex: 1,
    gap: 6,
  },
  threadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  threadName: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 16,
  },
  threadTime: {
    color: colors.textMuted,
    fontSize: 12,
  },
  threadMessage: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  profileHeaderCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 20,
    gap: 8,
  },
  profileName: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '800',
  },
  profileMeta: {
    color: '#FDEDE6',
    fontSize: 14,
  },
  profileBadgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 6,
  },
  profileInfoCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  profileInfoLine: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  profileParagraph: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabLabel: {
    color: '#8A6D69',
    fontSize: 13,
    fontWeight: '700',
  },
  tabLabelActive: {
    color: colors.primary,
  },
});
